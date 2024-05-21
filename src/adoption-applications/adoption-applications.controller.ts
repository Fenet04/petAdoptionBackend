import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { AdoptionApplicationsService } from './adoption-applications.service';
import { CreateAdoptionApplicationDto } from './dto/create-adoption-application.dto';
import { UpdateAdoptionApplicationDto } from './dto/update-adoption-application.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('adoption-applications')
export class AdoptionApplicationsController {
  constructor(private readonly adoptionApplicationsService: AdoptionApplicationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAdoptionApplicationDto: CreateAdoptionApplicationDto, @Request() req, @Query('petId') petId: string) {
        const userId = req.user.userId;
        return this.adoptionApplicationsService.create(createAdoptionApplicationDto, userId, petId);
      }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adoptionApplicationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adoptionApplicationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdoptionApplicationDto: UpdateAdoptionApplicationDto) {
    return this.adoptionApplicationsService.update(id, updateAdoptionApplicationDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.adoptionApplicationsService.updateStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adoptionApplicationsService.remove(id);
  }
}
