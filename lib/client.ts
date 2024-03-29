import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { getFileAsset } from '@sanity/asset-utils'

export const client = sanityClient({
    projectId: 'l4wrpsh5',
    dataset: 'production',
    apiVersion: '2023-01-16',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})

const builder = imageUrlBuilder(client);

export const urlFor = (source: any): any => builder.image(source);

export const videoAssetFor = (source: any): any => getFileAsset(source);