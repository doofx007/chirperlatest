<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Chirp Notification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #101010;
            color: #f0f0f0;
        }

        .email-container {
            max-width: 650px;
            margin: 30px auto;
            background: linear-gradient(145deg, #1b1b1b, #2a2a2a);
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
        }

        /* Header */
        .header {
            background-color: #24292f;
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
        }

        .header img {
            width: 80px;
            margin: 0 auto 15px;
            display: block;
        }

        .header h1 {
            font-size: 26px;
            font-weight: bold;
            margin: 0;
            text-transform: uppercase;
            color: #ffffff;
        }

        /* Body */
        .body {
            padding: 30px;
            background-color: #181818;
        }

        .message-container {
            background-color: #252525;
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            margin-bottom: 20px;
        }

        .user-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            float: left;
            margin-right: 15px;
        }

        .user-avatar img {
            width: 100%;
            height: auto;
        }

        .message-content {
            overflow: hidden;
        }

        .message-content p {
            background: #333333;
            padding: 15px;
            border-radius: 10px;
            color: #f0f0f0;
            font-size: 16px;
            margin: 0;
        }

        .user-info {
            margin-top: 10px;
            font-size: 14px;
            color: #888888;
        }

        .user-info strong {
            color: #ffffff;
        }

        /* Footer */
        .footer {
            background-color: #24292f;
            padding: 20px;
            text-align: center;
            color: #b3b3b3;
        }

        .footer p {
            margin: 10px 0;
            font-size: 14px;
        }

        .footer a {
            display: inline-block;
            padding: 12px 25px;
            background-color: #3b82f6;
            color: #ffffff;
            text-decoration: none;
            font-size: 14px;
            font-weight: bold;
            border-radius: 8px;
            transition: background-color 0.3s ease;
        }

        .footer a:hover {
            background-color: #2563eb;
        }

        /* Responsive Design */
        @media screen and (max-width: 768px) {
            .user-avatar {
                float: none;
                margin: 0 auto 15px;
                display: block;
            }

            .message-content {
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <img src="https://i.imgur.com/F8TsRk4.png" alt="Chirper Logo">
            <h1>New Chirp Notification</h1>
        </div>

        <!-- Body -->
        <div class="body">
            <div class="message-container">
                <div class="user-avatar">
                    <img src="https://i.pravatar.cc/60?u={{ $chirp->user->id }}" alt="User Avatar">
                </div>
                <div class="message-content">
                    <p>{{ $chirp->message }}</p>
                    <div class="user-info">
                        <strong>{{ $chirp->user->name }}</strong> • {{ \Carbon\Carbon::parse($chirp->created_at)->diffForHumans() }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Thank you for being a part of the Chirper community!</p>
            <a href="{{ url('/') }}">Visit Chirper</a>
        </div>
    </div>
</body>
</html>
