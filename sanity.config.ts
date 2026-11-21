import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { table } from '@sanity/table'
import { schemaTypes } from './src/sanity/schemas'
import { DeletePostAction } from './src/sanity/actions/deletePostAction'

export default defineConfig({
    name: 'height-comparison-blog-studio',
    title: 'Height Comparsion Blog Studio',

    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    basePath: '/studio',

    plugins: [structureTool(), table()],

    schema: {
        types: schemaTypes,
    },

    document: {
        actions: (prev, context) => {
            if (context.schemaType === 'post') {
                return [...prev.filter((a) => a.action !== 'delete'), DeletePostAction];
            }
            return prev;
        },
    },
})
