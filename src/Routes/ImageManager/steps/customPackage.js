import React from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import {
  Button,
  Popover,
  Stack,
  StackItem,
  Text,
  TextContent,
} from '@patternfly/react-core';
import useFormApi from '@data-driven-forms/react-form-renderer/use-form-api';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-triangle-icon';
import { releaseMapper } from '../../ImageManagerDetail/constants';

const CustomPackageLabel = () => {
  const { getState } = useFormApi();
  const addedRepos = getState()?.values?.['third-party-repositories'];
  const release = getState()?.values?.release;
  const releaseName = release !== undefined ? releaseMapper[release] : '';

  return (
    <TextContent>
      <Text>
        Add packages from{' '}
        <Popover
          style={{ visibility: 'visible' }}
          position="bottom"
          headerContent="Custom Repositories"
          bodyContent={
            <Stack>
              {addedRepos.map((repo) => (
                <StackItem key={repo}>
                  <Text>{repo.name}</Text>
                </StackItem>
              ))}
            </Stack>
          }
        >
          <Button variant="link" isInline>
            {addedRepos.length} custom repositories
          </Button>{' '}
          to your
        </Popover>
        <b> {releaseName}</b> image.
      </Text>
    </TextContent>
  );
};

export default {
  title: 'Custom packages',
  name: 'customPackages',
  nextStep: 'packages',
  substepOf: 'Add content',
  fields: [
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'description',

      label: <CustomPackageLabel />,
    },
    {
      component: componentTypes.TEXTAREA,
      style: {
        paddingRight: '32px',
        height: '25vh',
      },
      name: 'custom-packages',
      placeholder:
        'Enter or paste packages from linked repositories, one entry per line.\nExamplePackage\nexample-package\nexamplapackage',
      label: <b> Packages </b>,
      initialValue: [],
      clearedValue: [],
    },
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'packageDetails',
      label: (
        <Text>
          Specify individual packages by exact name and casing, with no
          whitespace, one entry to a line, and can include hyphens ( - ).
        </Text>
      ),
    },
    {
      component: componentTypes.PLAIN_TEXT,
      name: 'warning',
      label: (
        <Text className="pf-u-warning-color-200">
          <ExclamationTriangleIcon class="pf-u-warning-color-100" />
          &nbsp; Packages names that do not have exact name and casing will not
          be included in the image.
        </Text>
      ),
    },
  ],
};
