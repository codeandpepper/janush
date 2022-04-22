# Conventions

## Naming rules

### Files, constants, variables and functions names

Use camelCase notation.

### Classes, interfaces and types names

Use PascalCase notation.

## Modules import

#### Schema:

```
"external" modules
node "builtin" modules

"pathGroups" modules
"internal" modules

modules from a "parent" directory
"sibling" modules from the same or a sibling's directory
"index" of the current directory

"object" - imports (only available in TypeScript)

"type" imports (only available in Flow and TypeScript)
```

If there is more than 1 module defined per level - sort alphabetically (or by root of nesting for `relative-modules`).

#### Example:

```javascript
import ... from 'fs';
import ... from 'path';
import ... from 'react';

import ... from '@localAlias/filename';
import ... from '@localAlias/filename';
import ... from 'dirname/filename';

import ... from '../filename';
import ... from './filename';
import ... from './';

import type ... from './filename';
```

## Modules exports

### Use named exports in the line of function declaration

```javascript
export const myFunction = () => {};
```

## Functions

### Use arrow functions

```javascript
const myFunction = () => {};
```

### Declare arguments types

```javascript
const myFunction = (props: Props) => {};
```

### Declare return type

```javascript
const myFunction: ReturnType = () => {};
```

### React components

- Use react functional components.

- Type components with children using react FC.

  ```javascript
  export const MyComponent: FC<Props> = ({ label, text, children }) => {
    return (
      <div>
        <h1>{label}</h1>
        <p>{text}</p>
        {children}
      </div>
    );
  };
  ```

- Type components without children using react VFC.

  ```javascript
  export const MyComponent: VFC<Props> = ({ label, text }) => {
    return (
      <div>
        <h1>{label}</h1>
        <p>{text}</p>
      </div>
    );
  };
  ```

## Types vs Interfaces

### Use interfaces instead of types wherever it is possible

### Declare interface/type in place of its usage when it is used only in this place. In case of interface/type which is not defining the component props and is used in more than only one place extract it to separate file.
