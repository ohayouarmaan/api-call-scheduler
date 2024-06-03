import { Injectable } from '@nestjs/common';

@Injectable()
export class CronjobsService {
    getAll() {
        return {
            message: "Working!"
        };
    }
}
