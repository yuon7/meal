export default function ConfirmSignupPage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">確認メールを送信しました</h2>
        <p className="text-gray-600 mb-4">
          {searchParams.email} に確認メールを送信しました。
        </p>
        <p className="text-gray-600 mb-6">
          メール内のリンクをクリックして、アカウントを有効化してください。
        </p>
        <a
          href="/login"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          ログインページに戻る
        </a>
      </div>
    </div>
  );
}
