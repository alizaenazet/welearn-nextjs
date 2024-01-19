"use server";

import useSWR from 'swr'
import axios from 'axios'
import { getCurrentUser } from '@/lib/firebase/firebase-admin'
import { authenticateStudent } from '@/lib/firebase/auth';

export async function getAllInstructor() {
    const fetcher = (url: string) => axios.get(url).then(res => res.data)
    const { data, error, isLoading } = useSWR('/api/instructors', fetcher)
    return { data, error, isLoading }
}

export async function getUser() {

    const user =  await authenticateStudent()
    console.log("coooook");
    
    console.log(["aaaa💓",user?.uid]);
    
    return { user };
}




const mockInstructor = [
    {
        "id": "1",
        "name": "Subagyo",
        "DOB": "2005-03-11",
        "address": 
        {
            "street_number": "1",
            "route": "Jalan Letjen Suprapto",  // alamat 
            "postal_code": "93829", 
            "locality": "Probolinggo, Mayangan",  // kota, kecamatan 
            "administrative_area_level_1": "Jawa Timur" // provinsi
        },
        "phone": "082244838463",
        "expretise":
        [
            {
                "id": "1",
                "name": "golang"
            },
            {
                "id": "2",
                "name": "java"
            }
        ],
        "image_url": "klsdajflsjfdslajfslkafjsadlkdjsda.jpg"
    },
    {
        "id": "2",
        "name": "Subagyo",
        "DOB": "2005-03-11",
        "address": 
        {
            "street_number": "1",
            "route": "Jalan Letjen Suprapto",  // alamat 
            "postal_code": "93829", 
            "locality": "Probolinggo, Mayangan",  // kota, kecamatan 
            "administrative_area_level_1": "Jawa Timur" // provinsi
        },
        "phone": "082244838463",
        "expretise":
        [
            {
                "id": "1",
                "name": "golang"
            },
            {
                "id": "2",
                "name": "java"
            }
        ],
        "image_url": "klsdajflsjfdslajfslkafjsadlkdjsda.jpg"
    }

]

const mockLesson :lessonListPreview[] = [
    {
        "id": "97794426-cc53-4b91-ab7a-93f43171ecd4",
        "title": "Andoroid dev 101",
        "instructorName": "budianton",
        "price": 99,
        "reviewerCount": 120,
        "imageUrl": "www.goodiamge.com/myimage.svg"
    },
    {
        "id": "97794426-cc53-4b91-ab7a-93f43171ecd4",
        "title": "Andoroid dev 101",
        "instructorName": "budianton",
        "price": 99,
        "reviewerCount": 120,
        "imageUrl": "www.goodiamge.com/myimage.svg"
    },
    {
        "id": "97794426-cc53-4b91-ab7a-93f43171ecd4",
        "title": "Andoroid dev 101",
        "instructorName": "budianton",
        "price": 99,
        "reviewerCount": 120,
        "imageUrl": "www.goodiamge.com/myimage.svg"
    },
    {
        "id": "97794426-cc53-4b91-ab7a-93f43171ecd4",
        "title": "Andoroid dev 101",
        "instructorName": "budianton",
        "price": 99,
        "reviewerCount": 120,
        "imageUrl": "www.goodiamge.com/myimage.svg"
    }
  ]