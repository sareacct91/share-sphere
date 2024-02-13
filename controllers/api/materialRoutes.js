const router = require('express').Router();
const { Material } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newMaterial = await Material.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newMaterial);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
    // find a single product by its `id`
    try {
      const materialData = await Material.findByPk(req.params.id, {
        include: [{ model: User }]
      });
  
      if (!materialData) {
        res.status(404).json({ message: 'No material found with this id!' });
        return;
      }
  
      res.status(200).json(materialData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put('/:id', async (req, res) => {
    // updates a category by id
    try {
      const materialData = await Material.update(req.body, {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!materialData[0]) {
        res.status(404).json({ message: 'No material with this id!' });
        return;
      }
      res.status(200).json(materialData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const materialData = await Material.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!materialData) {
      res.status(404).json({ message: 'No material found with this id!' });
      return;
    }

    res.status(200).json(materialData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;