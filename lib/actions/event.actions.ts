"use server"

import { CreateEventParams } from "@/types"
import { connectDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { handleError } from "../utils";

export const createEvent = async ({event, userId, path }: CreateEventParams) => {
    try {
        await connectDatabase();
        const organizer = await User.findById(userId);
        if(!organizer){
            throw new Error('Could not find organizer');
        }
        const newEvent = await Event.create({...event, category: event.categoryId, organizer: userId});
        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        console.log(error);
        handleError(error);
    }
}