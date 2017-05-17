-- BOUNCE TYPES --
INSERT INTO "public"."bounceTypes"("bounceTypeId","name","description","retryAfterNSeconds")
VALUES
(1,E'HardBounce',E'Hard bounce — The server was unable to deliver your message (ex: unknown user, mailbox not found).',NULL),
(2,E'Transient',E'Message delayed — The server could not temporarily deliver your message (ex: Message is delayed due to network troubles).',NULL),
(16,E'Unsubscribe',E'Unsubscribe request — Unsubscribe or Remove request.',NULL),
(32,E'Subscribe',E'Subscribe request — Subscribe request from someone wanting to get added to the mailing list.',NULL),
(64,E'AutoResponder',E'Auto responder — Automatic email responder (ex: "Out of Office" or "On Vacation").',NULL),
(128,E'AddressChange',E'Address change — The recipient has requested an address change.',NULL),
(256,E'DnsError',E'DNS error — A temporary DNS error.',NULL),
(512,E'SpamNotification',E'Spam notification — The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.',NULL),
(1024,E'OpenRelayTest',E'Open relay test — The NDR is actually a test email message to see if the mail server is an open relay.',NULL),
(2048,E'Unknown',E'Unknown — Unable to classify the NDR.',NULL),
(4096,E'SoftBounce',E'Soft bounce — Unable to temporarily deliver message (i.e. mailbox full, account disabled, exceeds quota, out of disk space).',NULL),
(8192,E'VirusNotification',E'Virus notification — The bounce is actually a virus notification warning about a virus/code infected message.',NULL),
(16384,E'ChallengeVerification',E'Spam challenge verification — The bounce is a challenge asking for verification you actually sent the email. Typcial challenges are made by Spam Arrest, or MailFrontier Matador.',NULL),
(100000,E'BadEmailAddress',E'Invalid email address — The address is not a valid email address.',NULL),
(100001,E'SpamComplaint',E'Spam complaint — The subscriber explicitly marked this message as spam.',NULL),
(100002,E'ManuallyDeactivated',E'Manually deactivated — The email was manually deactivated.',NULL),
(100003,E'Unconfirmed',E'Registration not confirmed — The subscriber has not clicked on the confirmation link upon registration or import.',NULL),
(100006,E'Blocked',E'ISP block — Blocked from this ISP due to content or blacklisting.',NULL),
(100007,E'SMTPApiError',E'SMTP API error — An error occurred while accepting an email through the SMTP API.',NULL),
(100008,E'InboundError',E'Processing failed — Unable to deliver inbound message to destination inbound hook.',NULL),
(100009,E'DMARCPolicy',E'DMARC Policy — Email rejected due DMARC Policy.',NULL),
(100010,E'TemplateRenderingFailed',E'Template rendering failed — An error occurred while attempting to render your template.',NULL);

-- TEMP LOGIN --
INSERT INTO "users"("userId","username","password","firstName","lastName","canAccess")
VALUES
(E'2eedee40-67f0-461a-81b3-2edad9983f45',E'temp',E'$2a$08$z3OM5gI0KB0txV.4Dml5fex9uzD7.NpvnZqTWKP6QkO1hxUw..Npy',NULL,NULL,TRUE);
