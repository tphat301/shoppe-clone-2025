import React from 'react'
import type { Preview } from '@storybook/react'
import '../src/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from '../src/contexts/app.context.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
})
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <AppProvider>
              <Fragment>
                <Story />
              </Fragment>
            </AppProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </BrowserRouter>
    )
  ]
}

export default preview
