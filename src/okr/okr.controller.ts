import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthorizationGuard } from 'src/auth/auth.guard';
import { PermissionsGuard } from 'src/auth/permissions/permissions.guard';
import { CreateOkrDto } from './dto/create-okr.dto';
import { OkrService } from './okr.service';
import { Permissions } from 'src/auth/permissions/permissions.decorator';

@Controller('okr')
export class OkrController {
    constructor( private readonly okrService: OkrService){}


    @UseGuards(AuthGuard('jwt'),PermissionsGuard)   
    @Get()
    @Permissions('read:okr')
    async findAll() {
        return await this.okrService.findAll();
    }

    
    @UseGuards(AuthGuard('jwt'),PermissionsGuard)   
    @Get("/:id")
    @Permissions('read:okr')
    async find(@Param("id") id: string) {
        return await this.okrService.find(id);
    }

    @UseGuards(AuthGuard('jwt'),PermissionsGuard) 
    @Post()
    @Permissions('write:okr')
    async create(@Body() createOkrDto: CreateOkrDto) {
        return await this.okrService.create(createOkrDto);
    }

    @UseGuards(AuthGuard('jwt'),PermissionsGuard) 
    @Patch(':id')
    @Permissions('edit:okr')
    async update(@Param("id") id: string, @Body() createOkrDto: CreateOkrDto) {
        return await this.okrService.update(id,createOkrDto);
    }

    @UseGuards(AuthGuard('jwt'),PermissionsGuard) 
    @Delete("/:id")
    @Permissions('delete:okr')
    @HttpCode(204)
    async delete(@Param("id") id: string) {
      return await this.okrService.delete(id);
    }
}
