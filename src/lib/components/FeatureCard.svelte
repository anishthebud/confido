<script>
  export let icon;
  export let title;
  export let description;
</script>

<div class="bg-white p-6 rounded-xl shadow-md">
  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
    {@html icon.svg}
  </div>
  <h3 class="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
  <p class="text-gray-600">{description}</p>
</div>