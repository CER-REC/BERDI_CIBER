import React from 'react';
import { ButtonBase } from '@material-ui/core';
import { useIntl } from 'react-intl';
import useConfig from '../../../hooks/useConfig';
import useESAData from '../../../hooks/useESAData';

const AddContentIdsButton = () => {
  const intl = useIntl();
  const { contentIds, totalCount } = useESAData();
  const { configDispatch } = useConfig();
  const handleAddAllClick = () => {
    configDispatch({ type: 'cartIds/added', payload: contentIds });
  };
  return (
    <ButtonBase style={{ color: '#07456B', textDecoration: 'underline', paddingTop: '1em' }} onClick={handleAddAllClick}>
      { totalCount === 1
        ? intl.formatMessage({ id: 'components.addContentIdsButton.addTablesSingle' }, {
          num: <span style={{ fontWeight: 700 }}>{totalCount}</span>,
        })
        : intl.formatMessage({ id: 'components.addContentIdsButton.addTablesPlural' }, {
          num: <span style={{ fontWeight: 700 }}>{totalCount}</span>,
        })}
      {/* { totalCount === 1
        ? intl.formatMessage({ id: 'components.addContentIdsButton.addTablesSingle' }, {
          num: totalCount,
        })
        : intl.formatMessage({ id: 'components.addContentIdsButton.addTablesPlural' }, {
          num: <span>{totalCount}</span>,
        })} */}
    </ButtonBase>
  );
};

export default AddContentIdsButton;
