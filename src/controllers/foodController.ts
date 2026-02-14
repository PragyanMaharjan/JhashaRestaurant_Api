const Food = require('../models/Food');

// Get all food items
exports.getAllFood = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });
    res.status(200).json({ foods });
  } catch (error) {
    next(error);
  }
};

// Get single food item
exports.getFoodById = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ food });
  } catch (error) {
    next(error);
  }
};

// Add food (Admin only)
exports.addFood = async (req, res, next) => {
  try {
    const { name, description, category, price, preparationTime, isVegetarian, spiceLevel } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Food image is required' });
    }

    const food = new Food({
      name,
      description,
      category,
      price,
      image: req.file.filename,
      preparationTime: preparationTime || 30,
      isVegetarian: isVegetarian || false,
      spiceLevel: spiceLevel || 'medium'
    });

    await food.save();

    res.status(201).json({
      message: 'Food added successfully',
      food
    });
  } catch (error) {
    next(error);
  }
};

// Update food (Admin only)
exports.updateFood = async (req, res, next) => {
  try {
    const { name, description, category, price, preparationTime, isAvailable, isVegetarian, spiceLevel } = req.body;

    let food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    if (name) food.name = name;
    if (description) food.description = description;
    if (category) food.category = category;
    if (price) food.price = price;
    if (preparationTime) food.preparationTime = preparationTime;
    if (isAvailable !== undefined) food.isAvailable = isAvailable;
    if (isVegetarian !== undefined) food.isVegetarian = isVegetarian;
    if (spiceLevel) food.spiceLevel = spiceLevel;

    if (req.file) {
      food.image = req.file.filename;
    }

    await food.save();

    res.status(200).json({
      message: 'Food updated successfully',
      food
    });
  } catch (error) {
    next(error);
  }
};

// Delete food (Admin only)
exports.deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.status(200).json({ message: 'Food deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export {};
