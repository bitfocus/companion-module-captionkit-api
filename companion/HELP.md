## CaptionKit

[CaptionKit](https://captionkit.io/) provides realtime captions and translations for your church, to help
provide accessible services with multilingual and hard-of-hearing congregations.

This module will allow you to use [CaptionKit signals](https://docs.captionkit.io/en/articles/10172993-signals)
to remotely control your CaptionKit dashboard or app. You can use signals to start and stop captions, set the
language, control caption visibility and more.

To get started, [create an API key](https://docs.captionkit.io/en/articles/10172972-connect-to-the-api) in the
CaptionKit dashboard. Then, in Companion, add this module under Connections, and in the connection configuration
paste the API key.

There are CaptionKit presets provided for all signals, or you can use the "Send signal" and "Set transcription
language" actions as part of more complex buttons.

### Live session status

The module polls your account's caption session status (every 5 seconds by default — configurable in the
connection settings) and exposes it as feedbacks and variables:

- **Caption session is live** feedback — turns a button red while captions are running. The "Caption status"
  preset gives you a ready-made tally button, and the start/stop caption presets light up while live.
- Variables for the session status (`status_text`, `language`, `translations`, `session_id`, `started_at`)
  that you can place on any button label.

### Major Changes

- v1.0.x - Initial release
- v1.1.x - Obtain list of input languages from CaptionKit's API, rather than them being hard-coded
- v1.2.x - Live caption session status: status polling, feedbacks, variables and a status preset; API calls
  now target api.captionkit.com
