import React from 'react';
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const CollectionsList = ({ collections, headFields, handleRemoveCollection }) => {
  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              {headFields.map((item) => (
                <TableCell key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {collections.map((collection) => (
              <TableRow hover key={collection.id}>
                {collection.collection && (
                  <TableCell>{collection.collection}</TableCell>
                )}
                {collection.pricelimit && (
                  <TableCell>{collection.pricelimit}</TableCell>
                )}
                <TableCell
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    width: '300px',
                    display: 'block',
                    overflow: 'hidden',
                  }}
                >
                  {collection.webhook}
                </TableCell>
                <TableCell>
                  <input
                    type='checkbox'
                    checked={collection.rarity}
                    readOnly
                    style={{ marginRight: '8px' }}
                  />
                </TableCell>
                <TableCell>{collection.raritylimit}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveCollection(collection.id)}
                    color='secondary'
                  >
                    <ClearIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};

export default CollectionsList;
