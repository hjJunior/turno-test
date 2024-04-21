<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Laravel</title>

  @vite(['resources/css/app.css', 'resources/ts/main.ts'])
</head>

<body class="bg-gray-50">
  <div id="app"></div>
</body>

</html>
