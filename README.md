# Events

```ts
interface Event {
  type: string;
  data: any;
}

const list_of_events: Array<Event> = [];
```

<hr>

# Post service

```ts
const port = 3000;

/*
    Events

    post -> event bus:
        type: PostCreated
        data: {id: string, title: string, content: string}
    
    post <- event bus:

*/
```

<hr>

# Comment service

```js
const port = 3001;

/*
    Events

    comment -> event bus:
        type: CommentCreated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

        type: CommentUpdated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

    comment <- event bus:
        type: CommentModerated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}
*/
```

<hr>

# Query service

```js
const port = 3002;

/*
    Events

    query -> event bus:

    query <- event bus:
        type: CommentUpdated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

        type: CommentCreated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

        type: PostCreated
        data: {id: string, title: string, content: string}


*/
```

<hr>

# Event buss

```js
const port = 3003;

/*
    Events

    event bus -> post:
        type: PostCreated
        data: {id: string, title: string, content: string}

        type: CommentCreated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

        type: CommentModerated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

        type: CommentUpdated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

    post <- event bus:

*/
```

<hr>

# moderation service

```js
const port = 3004;

/*
    Events

    moderation -> event bus:
        type: CommentModerated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

    moderation <- event bus:
        type: CommentCreated
        data: {id: string, content: string, postId: string, status: 'aproved' | 'reject' | 'pending'}

*/
```

<hr>
