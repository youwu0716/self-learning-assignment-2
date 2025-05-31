export default async function handler(req, res) {
  if (req.method === 'GET') {
    // 模拟清理缓存的逻辑
    console.log('Executing daily maintenance task: clearing cache...');
    // Add actual cache clearing code here, for example:
    // - Cleaning up old data in the database
    // - Deleting temporary files
    // - Invalidating certain caches

    res.status(200).json({ message: 'Daily maintenance task executed successfully: cache cleared.' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}