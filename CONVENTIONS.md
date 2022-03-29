# Conventions
## Naming rules
### Files, constants, variables and functions names

Use camelCase notation.
### Classes, interfaces and types names

Use PascalCase notation.
## Modules import
#### Schema:

```
defining-modules
builtIn-modules
external-modules

alias-modules
relative-modules

styling-modules
```

If there is more than 1 module defined per level - sort alphabetically (or by root of nesting for `relative-modules`).
#### Example:

```javascript
import ... from 'definingModule'; // e.g. 'react'
import ... from 'builtInModuleA';
import ... from 'builtInModuleB';
import ... from 'externalModuleA';
import ... from 'externalModuleB';

import ... from '@localAlias/a.ts';
import ... from '@localAlias/b.ts';
import ... from '../e.ts';
import ... from './d.ts';
import ... from './f.ts';

import ... from './styles';
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
const myFunction = (props: PropsType) => {};
```
### Declare return type

```javascript
const myFunction: ReturnType = () => {};
```
### React components

- Use react functional components.

- Type components with children using react FC.

  ```javascript
  export const MyComponent: React.FC<PropsType> = ({ label, text, children }) => {
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
  export const MyComponent: React.VFC<PropsType> = ({ label, text }) => {
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
### Declare interface/type in place of its usage when it is used only in this place. Everytime it is used in more than one place extract it to separate file.
