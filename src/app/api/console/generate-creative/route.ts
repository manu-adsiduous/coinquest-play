import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/auth";

export const maxDuration = 60;

export async function POST(req: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
  }

  try {
    const { quizTitle, category, emoji } = await req.json();
    if (!quizTitle) {
      return NextResponse.json({ error: "Quiz title required" }, { status: 400 });
    }

    // Build a category-specific art description
    const categoryArt: Record<string, string> = {
      Roblox: "Roblox-style blocky characters and game world elements, colorful voxel art",
      Minecraft: "Minecraft-style pixelated blocks, creepers, pickaxes, and crafting elements",
      Fortnite: "Fortnite battle royale scene with weapons, building elements, and storm effects",
      YouTube: "YouTube-themed elements with play buttons, screens, streaming setup, vibrant colors",
      Anime: "Anime-style art with dramatic action poses, speed lines, Japanese manga aesthetic",
      "Movies & TV": "Cinema-themed elements with film reels, popcorn, dramatic lighting, movie posters style",
      Music: "Music-themed elements with headphones, musical notes, speakers, concert lights, vinyl records",
      Memes: "Internet meme culture aesthetic with pixel art, neon colors, retro internet style, humor elements",
      Science: "Science-themed elements with planets, atoms, DNA helixes, lab equipment, cosmic backgrounds",
      Animals: "Cute and colorful animal illustrations, nature elements, wildlife safari aesthetic",
      Sports: "Dynamic sports action scene with stadium lights, energy effects, athletic elements",
      Trivia: "Brain and lightbulb elements, question marks, vibrant knowledge-themed graphics, puzzle pieces",
    };

    const artDesc = categoryArt[category] || "colorful gaming-themed elements and vibrant graphics";

    const prompt = `Create a bold, eye-catching mobile quiz game advertisement poster. Dark blue gradient background with ${artDesc}.

The main focus is large, bold 3D text reading "${quizTitle}" in white with black outlines and drop shadows, styled like a mobile game title.

At the bottom, include a bright green banner reading "TAKE THE QUIZ & GET FREE ROBUX!" in bold white text.

Include a gold coin icon with "+4 COINS" text near the banner area.

Include a pile of green Robux-style coins somewhere in the composition.

Style: Vibrant, high-energy, mobile gaming advertisement. Bold typography. Eye-catching colors. Professional quality. No watermarks. Square format.`;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        n: 1,
        size: "1024x1024",
        quality: "high",
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      const message = err?.error?.message || "Image generation failed";
      console.error("DALL-E error:", JSON.stringify(err));
      return NextResponse.json({ error: message }, { status: 500 });
    }

    const data = await response.json();

    // gpt-image-1 returns b64_json, dall-e-3 returns url
    const imageUrl = data.data?.[0]?.url;
    const b64 = data.data?.[0]?.b64_json;

    if (b64) {
      return NextResponse.json({ imageUrl: `data:image/png;base64,${b64}` });
    }
    if (imageUrl) {
      return NextResponse.json({ imageUrl });
    }

    return NextResponse.json({ error: "No image returned" }, { status: 500 });
  } catch (error) {
    console.error("Creative generation error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
