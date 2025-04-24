<script lang="ts">
    import Calendar from '$lib/components/Calendar.svelte';
  
    const kelas = [
      { date: '2025-04-23', time: '18:00', kelas: 'Yoga' },
      { date: '2025-04-23', time: '19:00', kelas: 'Meditasi' },
      { date: '2025-04-25', time: '07:00', kelas: 'Sound Healing' },
      { date: '2025-05-21', time: '07:00', kelas: 'Pagi Ceria' },
      { date: '2025-05-21', time: '08:00', kelas: 'Sesi Fokus' },
      { date: '2025-05-21', time: '09:00', kelas: 'Releasing' },
    ];
  
    function handleBack() {
      window.history.back();
    }
  </script>
  
  <header class="w-full bg-white border-b border-rose-200 shadow-sm sticky top-0 z-20">
    <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
      <button class="text-gray-800 hover:text-gray-600 focus:outline-none" on:click={handleBack} aria-label="back">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-lg font-semibold text-gray-800 tracking-tight">Singing Bowl - Calendar</h1>
      <div></div>
    </div>
  </header>
  <main class="p-4">
    <Calendar kelasData={kelas} />
  </main>
  