import Line from "../models/line.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createLine = async (req, res, next) => {
  try {
    const { name, desc, status, products, jobs, tools, toolsImg, partImg } =
      req.body;

    // Create a new Line instance
    const newLine = new Line({
      name,
      desc,
      status,
      products,
      jobs,
      tools,
      toolsImg,
      partImg,
    });

    // Save the Line to the database
    const savedLine = await newLine.save();

    // Send the saved Line as the response
    res.status(201).json({
      success: true,
      message: "Line created successfully",
      data: savedLine,
    });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};
export const getAllLines = async (req, res, next) => {
  try {
    const lines = await Line.find();
    res.status(200).json({
      success: true,
      data: lines,
    });
  } catch (error) {
    next(error);
  }
};

export const getLineById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const line = await Line.findById(req.params.id);
    if (!line) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ data: line });
  } catch (error) {
    next(error);
  }
};

export const updateLine = async (req, res) => {};

export const deleteLine = async (req, res) => {};
