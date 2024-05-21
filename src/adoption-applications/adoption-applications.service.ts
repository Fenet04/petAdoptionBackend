import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAdoptionApplicationDto } from './dto/create-adoption-application.dto';
import { UpdateAdoptionApplicationDto } from './dto/update-adoption-application.dto';
import { AdoptionApplication, AdoptionApplicationDocument } from './schemas/adoption-application.schema';
import { Pet, PetDocument } from '../pets/schemas/pet.schema';

@Injectable()
export class AdoptionApplicationsService {
  
  constructor(
    @InjectModel(AdoptionApplication.name) private adoptionApplicationModel: Model<AdoptionApplicationDocument>,
    @InjectModel(Pet.name) private petModel: Model<PetDocument> 
  ) {}

  async create(createAdoptionApplicationDto: CreateAdoptionApplicationDto, userId: string, petId: string): Promise<AdoptionApplication> {
    const newAdoptionApplication = new this.adoptionApplicationModel({
      ...createAdoptionApplicationDto,
      userId,
      petId,
      createdAt: Date.now(),
    });
    try {
      return await newAdoptionApplication.save();
    } catch (error) {
      throw new HttpException('Failed to create adoption application', HttpStatus.BAD_REQUEST);
    }
  }
  

  async findAll(): Promise<AdoptionApplication[]> {
    try {
      return await this.adoptionApplicationModel.find().exec();
    } catch (error) {
      throw new HttpException('Failed to fetch adoption applications', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<AdoptionApplication> {
    try {
      const application = await this.adoptionApplicationModel.findById(id).exec();
      if (!application) throw new HttpException('Adoption application not found', HttpStatus.NOT_FOUND);
      return application;
    } catch (error) {
      throw new HttpException('Failed to find adoption application', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateAdoptionApplicationDto: UpdateAdoptionApplicationDto): Promise<AdoptionApplication> {
    try {
      const updatedApplication = await this.adoptionApplicationModel.findByIdAndUpdate(
        id,
        { ...updateAdoptionApplicationDto, updatedAt: Date.now() },
        { new: true }
      ).exec();
      if (!updatedApplication) throw new HttpException('Adoption application not found', HttpStatus.NOT_FOUND);
      return updatedApplication;
    } catch (error) {
      throw new HttpException('Failed to update adoption application', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<AdoptionApplication> {
    try {
      const deletedApplication = await this.adoptionApplicationModel.findByIdAndDelete(id).exec();
      if (!deletedApplication) throw new HttpException('Adoption application not found', HttpStatus.NOT_FOUND);
      return deletedApplication;
    } catch (error) {
      throw new HttpException('Failed to delete adoption application', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateStatus(id: string, status: string): Promise<AdoptionApplication> {
    try {
      const updatedApplication = await this.adoptionApplicationModel.findByIdAndUpdate(
        id,
        { status, updatedAt: Date.now() },
        { new: true }
      ).exec();
      if (!updatedApplication) throw new HttpException('Adoption application not found', HttpStatus.NOT_FOUND);
      return updatedApplication;
    } catch (error) {
      throw new HttpException('Failed to update adoption application status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findMatchingPets(typeOfPet: string, gender: string, ageRange: string): Promise<Pet[]> {
    try {
      return await this.petModel.find({
        type: typeOfPet,
        gender: gender,
        age: { $in: ageRange.split(',') },
      }).exec();
    } catch (error) {
      throw new HttpException('Failed to find matching pets', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
