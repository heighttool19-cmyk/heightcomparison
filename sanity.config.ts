import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
    name: 'height-comparison-blog-studio',
    title: 'Height Comparsion Blog Studio',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    basePath: '/studio',

    plugins: [structureTool()],

    schema: {
        types: schemaTypes,
    },
})
