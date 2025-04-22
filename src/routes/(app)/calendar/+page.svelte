<script lang="ts">
    import Calendar from '$lib/Calendar.svelte';
  
    const kelas = [
      { date: '2025-04-23', time: '18:00', kelas: 'Yoga' },
      { date: '2025-04-23', time: '19:00', kelas: 'Meditasi' },
      { date: '2025-04-25', time: '07:00', kelas: 'Sound Healing' },
      { date: '2025-08-21', time: '07:00', kelas: 'Pagi Ceria' },
      { date: '2025-08-21', time: '08:00', kelas: 'Sesi Fokus' },
      { date: '2025-08-21', time: '09:00', kelas: 'Releasing' },
    ];
  </script>
  
  <main class="p-4">
    <Calendar kelasData={kelas} />
  </main>
  