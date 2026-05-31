import {HttpLink} from "@apollo/client/link/http"
import { ApolloClient,InMemoryCache } from "@apollo/client"
const httpLink=new HttpLink({
  uri:"/graphql"
})
export const client=new ApolloClient({
  link:httpLink,
  cache:new InMemoryCache()
})