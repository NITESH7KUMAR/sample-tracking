import { Request, Response } from 'express';
import Sample from '../models/Sample';

// Add a new sample
export const addSample = async (req: Request, res: Response) => {
  try {
    const { hospital, patientName } = req.body;
    const agentId = (req as any).user.id;

    const sample = await Sample.create({
      hospital,
      patientName,
      agentId,
      status: 'pending',
      tracking: [{ status: 'pending', timestamp: new Date() }],
    });

    res.status(201).json(sample);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add sample', error });
  }
};

// Mark sample as collected
export const markCollected = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findByIdAndUpdate(
      req.params.id,
      {
        status: 'collected',
        $push: {
          tracking: { status: 'collected', timestamp: new Date() },
        },
      },
      { new: true }
    );

    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    res.json(sample);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark as collected', error });
  }
};

// Get samples assigned to the logged-in agent
export const getSamplesForAgent = async (req: Request, res: Response) => {
  try {
    const samples = await Sample.find({ agentId: (req as any).user.id });
    res.json(samples);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch samples', error });
  }
};

// Report delay in sample collection
export const reportDelay = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findByIdAndUpdate(
      req.params.id,
      {
        status: 'delayed',
        $push: {
          tracking: { status: 'delayed', timestamp: new Date() },
        },
      },
      { new: true }
    );

    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    res.json(sample);
  } catch (error) {
    res.status(500).json({ message: 'Failed to report delay', error });
  }
};

// Generic status update
export const updateSampleStatus = async (req: Request, res: Response) => {
  const sampleId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const sample = await Sample.findById(sampleId);

    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    sample.status = status;
    sample.tracking.push({ status, timestamp: new Date() });

    await sample.save();

    res.status(200).json({
      message: 'Sample status updated successfully',
      sample,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get full tracking history of a sample
export const getSampleTracking = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findById(req.params.id);

    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    res.status(200).json({ tracking: sample.tracking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
