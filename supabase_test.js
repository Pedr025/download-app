const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://arkeruofrcqqluejrglu.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFya2VydW9mcmNxcWx1ZWpyZ2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNTU5NjksImV4cCI6MjA4NjkzMTk2OX0.-zBwImuvLwCFR5ZyMSgf90dzIbqe5YllW9p09wDZ2mE'
);

async function test() {

  console.log("🚀 testando conexão...");

  const { data, error } = await supabase
    .from('watch_progress')
    .insert({
      user_id: 'termux_test',
      content_id: 'FUBCINNAOD LEGAL9',
      time_position: 12.34,
      duration: 120,
      updated_at: new Date()
    });

  if (error) {
    console.log("❌ ERRO:");
    console.log(error);
  } else {
    console.log("✅ SALVO COM SUCESSO!");
    console.log(data);
  }

}

test();
