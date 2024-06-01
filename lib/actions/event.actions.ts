"use server"

import { CreateEventParams, DeleteEventParams, GetAllEventsParams } from "@/types"
import { connectDatabase } from "../database";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";
import { handleError } from "../utils";
import Category from "../database/models/category.model";
import { revalidatePath } from "next/cache";



const populateEvent = (query: any) => {
    return query
      .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
  }

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

export const getEventById = async(eventId: any) => {

    try {
        await connectDatabase();
        const event = await populateEvent(Event.findById(eventId));
        if(!event){
            throw new Error("Event not found");
        }
        return JSON.parse(JSON.stringify(event));
    } catch (error) {
        handleError(error);
    }
}

export const getAllEvents= async({query, limit = 6, page, category}: GetAllEventsParams) => {

    try {
        await connectDatabase();
        const conditions = {};
        const eventsQuery = Event.find(conditions)
        .sort({ createdAt: 'desc'})
        .skip(0)
        .limit(limit);
        const events = await populateEvent(eventsQuery);
        const eventsCount = await Event.countDocuments(conditions);
        if(!events){
            throw new Error("Event not found");
        }
        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        }
    } catch (error) {
        handleError(error);
    }
}

export const deleteEvent = async({eventId, path}: DeleteEventParams) => {

    try {
        await connectDatabase();
        const deleteEvent = await Event.findByIdAndDelete(eventId);
        if(deleteEvent) revalidatePath(path);
    } catch (error) {
        handleError(error);
    }
}
