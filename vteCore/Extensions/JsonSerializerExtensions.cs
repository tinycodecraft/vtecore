﻿using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using System.Threading;


namespace vteCore.Extensions
{

    public static class JsonSerializerExtensions
    {
        public static T? DeserializeAnonymousType<T>(this string json, T? anonymousTypeObject=default, JsonSerializerOptions? options = default) where T: class
            => JsonSerializer.Deserialize<T>(json, options ?? new JsonSerializerOptions { PropertyNameCaseInsensitive = true, ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles });


        
        /*
        ValueTask is a struct that can represent both synchronous and asynchronous operations.When the operation is already completed, ValueTask can hold the result directly without any heap allocations.If the operation is not yet completed, ValueTask can switch to using a Task internally, but only if necessary.        
        */
        public static ValueTask<TValue?> DeserializeAnonymousTypeAsync<TValue>(Stream stream, TValue anonymousTypeObject, JsonSerializerOptions? options = default, CancellationToken cancellationToken = default)
            => JsonSerializer.DeserializeAsync<TValue>(stream, options, cancellationToken); // Method to deserialize from a stream added for completeness
    }
}
