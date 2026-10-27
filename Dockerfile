FROM nginx:alpine

ARG VERSION=v1

LABEL project="ProductCatalog" \
      version="${VERSION}"

COPY ${VERSION}/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
