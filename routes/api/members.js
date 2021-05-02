const express = require('express');
const members = require('../../memebrs.js');
const uuid = require('uuid');
const router = express.Router();

// we have route in main file, that means we dont need it here,

// get all members
router.get('/', (req, res) => {
  res.json(members);
});

// get single memeber. req.params.id -> send it as a string

router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// create member

router.post('/', (req, res) => {
  const newMemeber = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  if (!newMemeber.name || !newMemeber.email) {
    return res.status(400).json({ msg: 'Please include a name and email address' });
  }

  members.push(newMemeber);
  // res.json(members);
  res.redirect('/');
});

// update Member
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updateMemeber = req.body;

    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMemeber.name ? updateMemeber.name : member.name;
        member.email = updateMemeber.email ? updateMemeber.email : member.email;

        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete member

router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id !== parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;

// in we are dealing with templates we wanna redirect and not to send / show json
