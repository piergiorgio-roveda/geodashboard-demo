# APP_MODULES

## Example for `g_options`

```json
{
  "test":"A"
}
```

In JavaScript, you can access the values of `g_options` like this:

```javascript

let x_module_master = 'ADDON999_MODULE';
let x_options = {};

dyn_functions['module_ready'] = function(){

  let _o = geoObject.modules.filter(
    ({properties}) => properties.master == a321_module_master
    )[0].properties;
    
  x_options = _o.g_options;

}