import { supabase } from "../../../lib/server/supabaseClient";

export async function load({params}) {
    const presentationData = await supabase.from("presentation").select().eq('id', params.slug);
    const recordingData = await supabase.from('recordings').select().eq('presentationId', params.slug)
    return {
      presentation: presentationData ?? [],
      recording: recordingData ?? []
    };
  }

  export async function getBadges(recordingId: number) {
    var cids: any = new Array()

    const scoreFrom = await supabase.from("recordings").select('score').eq('id', recordingId).single()
    if (!scoreFrom.data) {
      return cids;
    }
    const { data: { session }, error } = await supabase.auth.getSession();
    if (!session) {
      return cids;
    }
    
    let user_id = session.user.id;
    let scoreNum = scoreFrom.data.score;
    let scoreInt = parseInt(scoreNum);
    /* Conditional logic for presentations */
    const {data, count} = await supabase.from("presentation").select('*', {count: 'exact'}).eq('user_id', user_id)
    if (count == 5) {
      cids.push("bafkreigfdn2ijlaywjbjoedm3zmzdi26df5vzfamxpqucmxcnvxzbsjaxa")
    } else if (count == 3) {
      cids.push("bafkreihuea4uyszm57admnx5otb5hskuii6rg72gzipz7lizhqaez6yimq")
    } else if (count == 1) {
      cids.push("bafkreidrtdcqqpiewnwzttqvabxkna4bwibmefxlql5agz235z3opgx6ru")
    }
    /* Conditional logic for scores */
    if (scoreInt == 100) {
      const {data, count} = await supabase.from("recordings").select('*', {count: 'exact'}).eq('score', 100).eq('user_id', user_id)
      if (count == 5) {
        cids.push("bafkreig5vffd3q2lfalfteqat2lig5er64zv6rykcfw5zbhgxbdj4tv57a")
      } else if (count == 3) {
        cids.push("bafkreihucccvnma3o4oxztagitnxu2qowjcb7x3eajkzd7zsvgvpbc6gwy")
      } else if (count == 1) {
        cids.push("bafkreig75kpwq6osdb2ca7zo34ng5qzbwdrosbrotqsbpvbsplhifuuqv4")
      }
    } else if (scoreInt >= 80) {
      const {data, count} = await supabase.from("recordings").select('*', {count: 'exact'}).eq('score', 100).eq('user_id', user_id)
      if (count == 5) {
        cids.push("bafkreife6mmr5jx4fywvxw6izjzs7jxgfrf2uglqilblss76smwznajola")
      } else if (count == 3) {
        cids.push("bafkreifw6zhufzjciqbshix72l33vty2dbvh377qcosovw56yucbvs34pm")
      } else if (count == 1) {
        cids.push("bafkreih3cbyas2zzt54dcxvjrgsqna3g7ag6wft5itvnk4iwppiyu2szj4")
      }
    } else if (scoreInt >= 50) {
      const {data, count} = await supabase.from("recordings").select('*', {count: 'exact'}).gte('score', 50).eq('user_id', user_id)
      if (count == 5) {
        cids.push("bafkreieu24rdvev3g52el4xkzxzs2zp7kgdprzaazbwyve7ptp4vdzmb7m")
      } else if (count == 3) {
        cids.push("bafkreidojdjwrlbnb7go2q7ugc3liygqtksbesxni2druzn4xb7gky37qe")
      } else if (count == 1) {
        cids.push("bafkreid6obyqwcilnlilw3eqvrgxgsqrqiqqhwjv3gcehhbllx65pwkmhq")
      }
    }

    return cids;
  }
