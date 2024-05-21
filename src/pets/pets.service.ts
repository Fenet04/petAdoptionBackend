import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet, PetDocument } from './schemas/pet.schema';

@Injectable()
export class PetsService {
  
  constructor(@InjectModel(Pet.name) private petModel: Model<PetDocument>) {}

  async create(createPetDto: CreatePetDto): Promise<Pet> {
    const createdPet = new this.petModel(createPetDto);
    return createdPet.save();
  }

  async findAll(): Promise<Pet[]> {
    return this.petModel.find().exec();
  }

  async findOne(id: string): Promise<Pet> {
    return this.petModel.findById(id).exec();
  }

  async update(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
    return this.petModel.findByIdAndUpdate(id, updatePetDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Pet> {
    return this.petModel.findByIdAndDelete(id).exec();
  }
}
