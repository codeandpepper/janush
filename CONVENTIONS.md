# Conventions

### Modules import

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
