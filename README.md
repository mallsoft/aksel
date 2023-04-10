# Aksel

Aksel the seagull you needed on your site.

![bilde](https://user-images.githubusercontent.com/36839009/197385068-048745bf-7b08-4af9-be15-5de11e078751.png)

## Use

```JS
<script>
  import Aksel from 'aksel';
</script>

<!-- whatever you feel like (default size is 64) -->
<Aksel />
<!-- or -->
<Aksel size="{64}" />
<!-- or -->
<Aksel size="{ /* some expression that evaluates to a number... */ }" />

<!-- xmasMode - by default this is true when "new Date().getMonth() === 11" (december)  -->
<Aksel xmasMode={/* some expression or false for no xmas */} />
```
