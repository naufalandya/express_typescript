import { Response, Request } from "express"

export const getAllUsers = (req : Request, res : Response) => {
    res
    .status(500)
    .json({
        status : 'error',
        message : 'This route is not yet defined '
    })
}

export const createUsers = (req : Request, res : Response) => {
    res
    .status(500)
    .json({
        status : 'error',
        message : 'This route is not yet defined '
    })

}

export const getUserById = (req : Request, res : Response) => {
    res
    .status(500)
    .json({
        status : 'error',
        message : 'This route is not yet defined '
    })
}

export const updateUserById = (req : Request, res : Response) => {
    res
    .status(500)
    .json({
        status : 'error',
        message : 'This route is not yet defined '
    })
}

export const deleteUserById = (req : Request, res : Response) => {
    res
    .status(500)
    .json({
        status : 'error',
        message : 'This route is not yet defined '
    })
}
