import { NextResponse } from 'next/server';
import redisClient from '@/redisClient';

export async function GET() {

  const value = await redisClient.get('myKey');
  redisClient.disconnect();

  return NextResponse.json({ message: 'Key-value pair set in Redis: ' + value});
}
