# MangaTimeReactNative

## Icons

### [React-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

#### Usage

```
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
```

#### [Browse icons](https://oblador.github.io/react-native-vector-icons/)

## Debugger

### [React-native-debugger](https://github.com/jhen0409/react-native-debugger)

#### Debug app + redux

## Project structure

### Navigator

```
App/Navigator
App/Navigator/AppViews //View names
App/Navigator/index //Setup TabViews/StackView
```

### Components

Common component shared across Views

```
•App/Components
•App/Components/Buttons/ButtonA/index
•App/Components/Buttons/ButtonB/index
```

### Views

Contains all Views

```
•App/Views
•App/Views/Home/index
•App/Views/Home/Components/ComponentA //Component that is used only by this view
•App/Views/Home/Components/ComponentB //If this component is shared by 2+ Views, consider moving it
```
