import {createClient} from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

// lib/config.js
export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    token: 'skS6hb44tWHteMypuwDEXZZAOM5T70rCAo6mAocw9Q537JSQVofLOyC55SC2wQuzXVe4WmefEO8VErLKFNhAIUV3Aq4Twd8ffvyH2LnYzrSRq4UhIM8S3UhBS5YLJ4WAp4KmYHqReVyaMgOOeshEHQDx95HYUaU98zE76gmBK7hLQMUJuZZb',
    apiVersion: '2021-10-21', // Learn more: https://www.sanity.io/docs/api-versioning
    useCdn: process.env.NODE_ENV === 'production',
  }

  export const sanityClient = createClient(config)
  export const urlFor = (source) => createImageUrlBuilder(config).image(source)