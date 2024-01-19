
type lessonListPreview = {
    id: string,
    title: string,
    instructorName: string,
    price: number,
    reviewerCount: number,
    imageUrl: string   
}

type lessonFilterKeys = {
    isInited: boolean,
    tags?: string,
    method?: string,
    price?: string
}   

type instructorFilterKeys = {
    isInited: boolean,
    address?: string
}

type filterKeys = {
    lesson?: lessonFilterKeys
    instructor?: instructorFilterKeys
}