#!/bin/sh
printf '\n--- TEST MAIL ---\n' >> /tmp/mail-stub.log
cat >> /tmp/mail-stub.log
if [ -f /tmp/mail-stub.fail ]; then
  exit 1
fi
