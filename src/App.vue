<template>
  <div class="App uk-light uk-background-secondary" v-bind:data-activePage="activePage">
    <div class="App__view-container" v-on:click="MOVIE_DETAILS_DESELECTED">
      <div class="App__view uk-margin-top-small uk-margin-left uk-margin-right" data-page="home">
        <div class="HomePage">
          <h1>TMDb UI – Home</h1>
          <legend class="uk-legend" v-bind:data-testid="PROMPT_TESTID">{{ PROMPT }}</legend>
          <div class="SearchBar uk-inline uk-margin-bottom">
            <a
              class="uk-form-icon uk-form-icon-flip js-clear"
              v-bind:uk-icon="!isDiscoveryMode ? 'icon:close' : 'icon:search'"
              v-on:click="QUERY_RESETTED"
            >
            </a>
            <input
              class="SearchBar__input uk-input js-input"
              type="text"
              v-on:input="QUERY_CHANGED"
              v-bind:value="query || ''"
              v-bind:data-testid="QUERY_FIELD_TESTID"
            />
          </div>
          <h3
            class="uk-heading-bullet uk-margin-remove-top"
            v-bind:data-testid="RESULTS_HEADER_TESTID"
          >
            {{ isDiscoveryMode ? POPULAR_NOW : SEARCH_RESULTS_FOR(query) }}
          </h3>
          <div class="ResultsContainer" v-bind:data-testid="RESULTS_CONTAINER_TESTID">
            <div v-if="isLoadingResults">{{ LOADING }}</div>
            <div v-if="isErrorResults" v-bind:data-testid="NETWORK_ERROR_TESTID">
              {{ NETWORK_ERROR }}
            </div>
            <ul v-if="hasResults" class="uk-thumbnav">
              <li v-for="result in filteredResults" class="uk-margin-bottom">
                <a
                  class="ResultsContainer__result-item js-result-click"
                  v-on:click="MOVIE_SELECTED(result, $event);"
                  v-bind:data-id="result.id"
                >
                  <div class="ResultsContainer__thumbnail-holder">
                    <img v-bind:src="imageTmdbUrl(result)" alt="" />
                  </div>
                  <div class="ResultsContainer__caption uk-text-small uk-text-muted">
                    {{ result.title }}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="App__view uk-margin-top-small uk-margin-left uk-margin-right" data-page="item">
        <div v-if="hasMoviePage">
          <h1>{{ title || (details && details.title) }}</h1>
          <div v-if="isLoadingMovieDetails">{LOADING}</div>
          <div v-if="isErrorMovieDetails">{NETWORK_ERROR}</div>
          <div v-if="hasDetailsResults" class="MovieDetailsPage">
            <div class="MovieDetailsPage__img-container uk-margin-right" style="float: left">
              <img v-bind:src="imageTmdbDetailsUrl(details)" alt="" />
            </div>
            <dl class="uk-description-list">
              <dt>Popularity</dt>
              <dd>{{ details.vote_average }}</dd>
              <dt>Overview</dt>
              <dd>{{ details.overview }}</dd>
              <dt>Genres</dt>
              <dd>{{ details.genres.map(g => g.name).join(", ") }}</dd>
              <dt>Starring</dt>
              <dd>
                {{
                  cast.cast
                    .slice(0, 3)
                    .map(cast => cast.name)
                    .join(", ")
                }}
              </dd>
              <dt>Languages</dt>
              <dd>{{ details.spoken_languages.map(g => g.name).join(", ") }}</dd>
              <dt>Original Title</dt>
              <dd>{{ details.original_title }}</dd>
              <dt>Release Date</dt>
              <dd>{{ details.release_date }}</dd>
              <dt v-if="hasImdbId">IMDb URL</dt>
              <dd v-if="hasImdbId">
                <a v-bind:href="imageImdbUrl(details)">
                  {{ "https://www.imdb.com/title/" + details.imdb_id + "/" }}
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./App.js"></script>

<style src="./uikit.css"></style>
