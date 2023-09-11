export interface IImage {
    type: string
    content: string
}


/**
 * Response from the server. The image can be accessed on "http://[serverlink]/image/${id}", where the serverlink is link to the
 *  server. The serverlink usually stored in "environments.ts"
 */
export interface IUploadImageResponse {
    /**
     * Uploaded image can be accessed by "http://[serverlink]/image/${id}", where the serverlink is link to the server.
     */
    id: number
    type: string
    content: string
}