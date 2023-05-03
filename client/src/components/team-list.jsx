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
import moment from 'moment';

import ClearIcon from '@mui/icons-material/Clear';
const formatDate = (createdAt) => {
  return moment(createdAt).format("DD/MM/YYYY HH:mm");
};


const TeamsList = ({ staffs, headFields, handleRemoveStaff }) => {
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
            {staffs.map((staff) => (
              <TableRow hover key={staff.id}>
                {staff.username && (
                  <TableCell>{staff.username}</TableCell>
                )}
                {staff.discord && (
                  <TableCell>{staff.discord}</TableCell>
                )}
                {staff.createdAt && (
                  <TableCell>{formatDate(staff.createdAt)}</TableCell>
                )}
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveStaff(staff.id)}
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

export default TeamsList;
