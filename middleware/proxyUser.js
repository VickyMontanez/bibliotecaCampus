import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {User} from '../controller/user.js';
import {validate} from 'class-validator';

const proxyUser = express();
proxyUser.use(async(req,res,next)=>{
    try {
        let data = plainToClass(User, req.body, {excludeExtraneousValues: true});
        await validate(data);
        next();
    } catch (err) {
        console.log(err);
        res.end();
    }
})

export default proxyUser;