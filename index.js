const con = require('./db.js');
const pool = require('./pool.js');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/insertMainFlow', (req, res) => {
  const flow = req.body;

  const item_parts_number = flow.item_parts_number;
  const item_code = flow.item_code;
  const item_description = flow.item_description;
  const section_id = parseInt(flow.section_id);
  const revision_number = parseInt(flow.revision_number);;
  const flow_status = flow.flow_status;
  const remarks = flow.remarks;
  const encoded_by = flow.encoded_by;
  const date_encoded = flow.date_encoded;
  const flow_type = flow.flow_type;
  const sub_process_count = flow.sub_process_count;

  const sql = `INSERT INTO process_flow_main_tbl (item_parts_number, item_code, item_description, section_id, revision_number, flow_status, flow_remarks, encoded_by, date_encoded, flow_type, sub_process_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(sql, [
    item_parts_number,
    item_code,
    item_description,
    section_id,
    revision_number,
    flow_status,
    remarks,
    encoded_by,
    date_encoded,
    flow_type,
    sub_process_count
  ], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: 'Error inserting data.' });
    }
    const flow_main_id = results.insertId
    res.status(200).json({ 
      message: 'Process Flow Main inserted successfully',
      flow_main_id: flow_main_id
    });
  });
});

app.post('/insertKeyFlow', (req, res) => {
  const flow = req.body;

  const main_flow_id = parseInt(flow.main_flow_id);
  const operation_number = parseInt(flow.operation_number);
  const section_id = parseInt(flow.section_id);
  const parts_number = flow.parts_number;
  const revision_number = parseInt(flow.revision_number);
  const Pid = parseInt(flow.Pid);
  const sequence_number = parseInt(flow.sequence_number);
  const standard_time = parseFloat(flow.standard_time);
  const machine_time = parseFloat(flow.machine_time);
  const item_code = flow.item_code;

  const sql = `INSERT INTO process_flow_key_tbl 
    (flow_main_id, operation_number, section_id, item_parts_number, 
    revision_number, Pid, sequence_number, standard_time, machine_time, item_code) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(sql, [
    main_flow_id,
    operation_number,
    section_id,
    parts_number,
    revision_number,
    Pid,
    sequence_number,
    standard_time,
    machine_time,
    item_code,
  ], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: 'Error inserting data.' });
    }
    res.status(200).json({ message: 'Process Flow Key inserted successfully' });
  });
});

app.post('/insertSubFlow', (req, res) => {

  const flow = req.body;

  const main_flow_id = parseInt(flow.main_flow_id);
  const section_id = parseInt(flow.section_id);
  const parts_number = flow.parts_number;
  const revision_number = parseInt(flow.revision_number);
  const Pid = parseInt(flow.Pid);
  const SubPid = parseInt(flow.SubPid);
  const sequence_number = parseInt(flow.sequence_number);
  const parent_sequence = parseInt(flow.parent_sequence);
  const standard_time = parseFloat(flow.standard_time);
  const machine_time = parseFloat(flow.machine_time);
  const item_code = flow.item_code;
  const sampling = flow.check_sampling;
  const uncontrolled = flow.check_uncontrolled;
  const batching_type = flow.batching_type;
  const result_type = flow.result_type;
  const sub_status = flow.check_sub_status;
  const status = flow.status;
  const hidden = parseInt(flow.hidden);
  const with_quantity = flow.with_quantity;
  const condition_process_count = flow.condition_process_count;

  const sql = `INSERT INTO process_flow_sub_tbl 
    (flow_main_id, section_id, item_parts_number, revision_number, 
    Pid, SubPid, sequence_number, parent_sequence, standard_time, machine_time, item_code, 
    check_sampling, check_uncontrolled, sub_status, result_type, batching_type, 
    status, hidden, with_quantity, condition_process_count) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(sql, [
    main_flow_id,
    section_id,
    parts_number,
    revision_number,
    Pid,
    SubPid,
    sequence_number,
    parent_sequence,
    standard_time,
    machine_time,
    item_code,
    sampling,
    uncontrolled,
    sub_status,
    result_type,
    batching_type,
    status,
    hidden,
    with_quantity,
    condition_process_count,
  ], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: 'Error inserting data.' });
    }
    res.status(200).json({ message: 'Process Flow Sub inserted successfully' });
  });
});

app.post('/insertConditionFlow', (req, res) => {
  const condition = req.body;

  const sql = `INSERT INTO process_flow_condition_tbl 
    (flow_main_id, item_id, SubPid, sequence_number, parent_sequence, 
    detail_description, field_type, typical_value, min_value, max_value, 
    condition_status, visibility_status, database_name, table_name, 
    field_name1, field_name2, output_fieldname, fetching_eng, eng_server, 
    eng_db_username, eng_db_password) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
  pool.query(sql, [
    condition.main_flow_id,
    condition.item_id,
    condition.SubPid,
    condition.sequence_number,
    condition.parent_sequence,
    condition.detail_description,
    condition.field_type,
    condition.typical_value,
    condition.min_value,
    condition.max_value,
    condition.condition_status,
    condition.visibility_status,
    condition.database_name,
    condition.table_name,
    condition.field_name1,
    condition.field_name2,
    condition.output_fieldname,
    condition.fetching_eng,
    condition.eng_server,
    condition.eng_db_username,
    condition.eng_db_password,
  ], (error, results, fields) => {
    if (error) {
      console.error('Error inserting condition:', error);
      res.status(500).json({ error: 'Error inserting condition.', message: 'Network Error'});
    } else {
      const conditionId = results.insertId;
      console.log('Inserted condition with ID:', conditionId);
      res.status(200).json({
        message: 'Process Flow Condition inserted successfully',
        con: conditionId,
      });
    }
  });
});


app.post('/insertFormAssignmentItem', (req, res) => {
  const flowSub = req.body;

  const assignment_id = parseInt(flowSub.assignment_id);
  const sequence_number = parseInt(flowSub.sequence_number);
  const Pid = parseInt(flowSub.Pid);
  const SubPid = parseInt(flowSub.SubPid);
  const standard_time = parseFloat(flowSub.standard_time);
  const machine_time = parseFloat(flowSub.machine_time);
  const assignment_status = flowSub.assignment_status;
  const check_sampling = flowSub.check_sampling;
  const check_uncontrolled = flowSub.check_uncontrolled;
  const batching_type = flowSub.batching_type;
  const result_type = flowSub.result_type;

  const sql = `INSERT INTO form_assignment_item_tbl 
    (assignment_id, sequence_number, Pid, SubPid, Stdtime, Machtime, assignment_status, 
    check_sampling, check_uncontrolled, batching_type, result_type) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(sql, [
    assignment_id,
    sequence_number,
    Pid,
    SubPid,
    standard_time,
    machine_time,
    assignment_status,
    check_sampling,
    check_uncontrolled,
    batching_type,
    result_type,
  ], (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
      return res.status(500).json({ error: 'Error inserting data.' });
    } else {
      res.status(200).json({ message: 'Process Flow Sub inserted successfully' });
    }
  });
});

app.post('/insertFormAssignmentItemCondition', (req, res) => {
  const condition = req.body;

  const assignment_id = parseInt(condition.assignment_id);
  const item_id = parseInt(condition.item_id);
  const sequence_number = parseInt(condition.sequence_number);
  const SubPid = parseInt(condition.SubPid);
  const detail_description = condition.detail_description;
  const field_type = condition.field_type;
  const min_value = parseFloat(condition.min_value);
  const max_value = parseFloat(condition.max_value);
  const typical_value = condition.typical_value;
  const condition_code = condition.condition_code;
  const option_value = condition.option_value;
  // const with_judgement = parseInt(condition.with_judgement);
  const with_judgement = isNaN(parseInt(condition.with_judgement)) ? 0 : parseInt(condition.with_judgement);
  const visibility_status = parseInt(condition.visibility_status);
  const condition_status = condition.condition_status;

  const sql = `INSERT INTO form_item_conditions_tbl 
    (assignment_id, item_id, sequence_number, SubPid, detail_description, 
    field_type, min_value, max_value, typical_value, condition_code, 
    option_value, with_judgement, visibility_status, condition_status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  pool.query(sql, [
    assignment_id,
    item_id,
    sequence_number,
    SubPid,
    detail_description,
    field_type,
    min_value,
    max_value,
    typical_value,
    condition_code,
    option_value,
    with_judgement,
    visibility_status,
    condition_status,
  ], (error, results) => {
    if (error) {
      console.error('Error inserting data:', + error);
      return res.status(500).json({ error: 'Error inserting data.' });
    } else {
      res.status(200).json({ message: 'Item Condition inserted successfully' });
    }
  });
});

app.post('/insertItemCode', (req, res) => {
  const data = req.body;

  const sql = `INSERT INTO itemmaster_main (item_code, item_parts_number, item_description) VALUES (?, ?, ?)`;

  pool.query(sql, [
    data.item_code,
    data.item_parts_number,
    data.item_description
  ], (error, results, fields) => {
    if(error) {
      console.error('Error inserting item code:', error);
      res.status(500).json({ error: 'Error inserting item code.' });
    } else {
      const item_id = results.insertId;
      console.log('Inserted item code with ID:', item_id);
      res.status(200).json({
        message: 'Item Code inserted successfully',
        id: item_id,
      });
    }
  })
});

app.get('/flowKey/:flow_main_id', (req, res) => {
  const { flow_main_id } = req.params;

  const sql = "SELECT * FROM process_flow_key_tbl WHERE flow_main_id = ?";

  pool.getConnection((err, connection) => {
    connection.query(sql, [flow_main_id], (error, results, fields) => {
      if (error) {
        console.error('Error fetching conditions:', error);
        res.status(500).json({ error: 'Error fetching conditions.' });
      } else {
        res.status(200).json(results);
        connection.release();
      }
    });
  })
});

app.get('/flowSub/:flow_main_id', (req, res) => {
  const { flow_main_id } = req.params;

  const sql = "SELECT * FROM process_flow_sub_tbl WHERE flow_main_id = ?";

  pool.getConnection((err, connection) => {
    connection.query(sql, [flow_main_id], (error, results, fields) => {
      if (error) {
        console.error('Error fetching conditions:', error);
        res.status(500).json({ error: 'Error fetching conditions.' });
      } else {
        res.status(200).json(results);
        connection.release();
      }
    });
  })
});

app.get('/conditions/:flow_main_id', (req, res) => {
  const { flow_main_id } = req.params;

  const sql = "SELECT * FROM process_flow_condition_tbl WHERE flow_main_id = ?";

  pool.getConnection((err, connection) => {
    connection.query(sql, [flow_main_id], (error, results, fields) => {
      if (error) {
        console.error('Error fetching conditions:', error);
        res.status(500).json({ error: 'Error fetching conditions.'});
      } else {
        res.status(200).json(results);
        connection.release();
      }
    });
  })
});


app.get('/itemMaster/:item_code', (req, res) => {
  const { item_code } = req.params !== '' ? req.params : '';

  const sql = "SELECT * FROM itemmaster_main WHERE item_code LIKE ? ";

  pool.getConnection((err, connection) => {
    connection.query(sql, [item_code], (error, results, fields) => {
      if (error) {
        console.error('Error fetching conditions:', error);
        res.status(500).json({ error: 'Error fetching conditions.' });
      } else {
        res.status(200).json(results);
        connection.release();
      }
    });
  })
});

app.get('/getItemCondition/:assignment_id', (req, res) => {
  const { assignment_id } = req.params !== '' ? req.params : '';

  const sql = "SELECT * FROM form_item_conditions_tbl WHERE assignment_id = ?";

  pool.getConnection((err, connection) => {
    connection.query(sql, [assignment_id], (error, results, fields) => {
      if (error) {
        console.error('Error fetching conditions:', error);
        res.status(500).json({ error: 'Error fetching conditions.' });
      } else {
        res.status(200).json(results);
        connection.release();
      }
    });
  })
});

app.get('/itemmaster_main', (req, res) => {

  const sql = "SELECT * FROM itemmaster_main ORDER BY id_itemmaster DESC LIMIT 10";

  pool.getConnection((err, connection) => {
    connection.query(sql, [], (error, results, fields) => {
      if (error) {
        console.error('Error fetching conditions:', error);
        res.status(500).json({ error: 'Error fetching conditions.' });
      } else {
        res.status(200).json(results);
        connection.release();
      }
    });
  })
});

app.get('/getFormAssignment/:assignment_id', (req, res) => {
  const { assignment_id } = req.params !== '' ? req.params : '';

  const sql = "SELECT * FROM form_assignment_tbl WHERE assignment_id = ?";

  pool.getConnection((err, connection) => {
    connection.query(sql, [assignment_id], (error, results, fields) => {
      if (error) {
        console.error('Error fetching form:', error);
        res.status(500).json({ error: 'Error fetching form.' });
      } else {
        res.status(200).json(results);
        connection.release();
      }
    });
  })
});

app.post('/updateDeliveryDate', (req, res) => {
  const data = req.body;

  const sql = `UPDATE form_assignment_tbl SET delivery_date = ? WHERE assignment_id = ?`;

  pool.query(sql, [
    data.delivery_date,
    data.assignment_id,
  ], (error, results, fields) => {
    if(error) {
      console.error('Error updating:', error);
      res.status(500).json({ error: 'Error updating.' });
    } else {
      res.status(200).json({
        message: 'Delivery Date update successful',
      });
    }
  })
});

app.post('/updateDeliveryDateHeader', (req, res) => {
  const data = req.body;

  const sql = `UPDATE ccp_cci_input_main SET delivery_date = ? WHERE assignment_id = ?`;

  pool.query(sql, [
    data.delivery_date,
    data.assignment_id,
  ], (error, results, fields) => {
    if(error) {
      console.error('Error updating:', error);
      res.status(500).json({ error: 'Error updating.' });
    } else {
      res.status(200).json({
        message: 'Delivery Date update successful',
      });
    }
  })
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
