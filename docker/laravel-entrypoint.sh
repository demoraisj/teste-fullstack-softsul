#!/bin/bash

# Adapted copy from https://github.com/bitnami/bitnami-docker-laravel at 18/05/2022

# shellcheck disable=SC1091

set -o errexit
set -o nounset
set -o pipefail
# set -o xtrace # Uncomment this line for debugging purposes

# Load libraries
. /opt/bitnami/scripts/libbitnami.sh
. /opt/bitnami/scripts/liblog.sh
. /opt/bitnami/scripts/libos.sh

# Load Laravel environment
. /opt/bitnami/scripts/laravel-env.sh

print_welcome_page

if [[ "$*" = *"/opt/bitnami/scripts/laravel/run.sh"* ]]; then
    info "** Running Laravel setup **"
    /opt/bitnami/scripts/php/setup.sh
    composer install                         # new
    /opt/bitnami/scripts/laravel/setup.sh
    php artisan key:generate                 # new
    php artisan migrate                      # new
    info "** Laravel setup finished! **"
fi

echo ""
exec "$@"